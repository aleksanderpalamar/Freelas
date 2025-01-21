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
    if (description) updateData.description = description
    if (Array.isArray(skills)) updateData.skills = skills.join(',') // Convertendo array para string
    if (image) updateData.image = image
    if (userType) updateData.userType = userType
    if (whatsapp) updateData.whatsapp = whatsapp

    // Update user
    const updateUser = await prisma.user.update({
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
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updateUser
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ 
      error: 'Failed to update profile',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}