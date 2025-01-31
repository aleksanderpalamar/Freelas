import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !["accepted", "rejected", "pending"].includes(status)) {
      return new NextResponse("Status inválido", { status: 400 });
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        freela: {
          include: {
            client: true,
          },
        },
      },
    });

    if (!proposal) {
      return new NextResponse("Proposta não encontrada", { status: 404 });
    }

    // Verifica se o usuário é o dono do freela
    if (proposal.freela.client.id !== session.user.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const updatedProposal = await prisma.proposal.update({
      where: { id },
      data: {
        status,
      },
    });

    // Cria notificação se a proposta foi aceita
    if (status === "accepted") {
      await prisma.notification.create({
        data: {
          title: "Proposta Aceita! 🎉",
          message: `Sua proposta para o projeto "${proposal.freela.title}" foi aceita! Você já pode entrar em contato com o cliente.`,
          type: "proposal_accepted",
          userId: proposal.freelancerId,
          metadata: {
            freelancerId: proposal.freelancerId,
          },
        },
      });
    } else if (status === "rejected") {
      await prisma.notification.create({
        data: {
          title: "Proposta Recusada",
          message: `Sua proposta para o projeto "${proposal.freela.title}" foi recusada.`,
          type: "proposal_rejected",
          userId: proposal.freelancerId,
        },
      });
    }

    return NextResponse.json(updatedProposal.id);
  } catch (error) {
    console.error("[PROPOSAL_PATCH]", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}
