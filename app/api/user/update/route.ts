import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

interface UpdateData {
  name?: string;
  email?: string;
  password?: string;
  description?: string;
  skills?: string;
  image?: string;
  userType?: string;
  whatsapp?: string;
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { name, email, currentPassword, newPassword, description, skills, image, userType, whatsapp } = data

    // Validate email uniqueness
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: session.user.id
          }
        },
      })

      if (existingUser) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
      }
    }

    // Validate password change
    if (currentPassword && newPassword) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      })

      if (!user?.password) {
        return NextResponse.json({ error: 'Invalid operation' }, { status: 400 })
      }

      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
      }
    }

    // Prepare update data
    const updateData: UpdateData = {}
    
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (newPassword) updateData.password = await bcrypt.hash(newPassword, 10)
    if (description !== undefined && description !== null) updateData.description = description
    if (Array.isArray(skills) && skills.length > 0) updateData.skills = skills.join(',')
    if (image) updateData.image = image
    if (userType) updateData.userType = userType
    if (whatsapp) updateData.whatsapp = whatsapp

    // Busca os dados atuais do usuário
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        description: true,
        skills: true,
        image: true
      }
    })

    // Mantém os dados existentes se não forem fornecidos novos
    if (!updateData.description && currentUser?.description) {
      updateData.description = currentUser.description
    }
    if (!updateData.skills && currentUser?.skills) {
      updateData.skills = currentUser.skills
    }
    if (!updateData.image && currentUser?.image) {
      updateData.image = currentUser.image
    }

    console.log('Dados para atualização:', updateData)

    // Update user
    const user = await prisma.user.update({
      where: { 
        id: session.user.id 
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        description: true,
        skills: true,
        image: true,
        userType: true,
        whatsapp: true
      }
    })

    console.log('Usuário atualizado:', user)

    // Garante que skills seja um array antes de retornar
    const formattedUser = {
      ...user,
      skills: user.skills ? user.skills.split(',').filter(Boolean) : []
    }
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: formattedUser
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update profile',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}