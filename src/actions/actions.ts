"use server"

import { revalidatePath } from "next/cache"
import prisma from "../lib/db"

export async function createPost(formData: FormData) {
    await prisma.post.create({
        data: {
            title: formData.get('title') as string,
            slug: (formData.get('title') as string).replace(/\s/g, '-').toLowerCase(),
            content: formData.get('content') as string,
            author: {
                connect: {
                    email: "drmosuhli@gmail.com"
                }
            }
        }
    })
    revalidatePath('/posts');
}

export async function getAllPosts() {
    // return await prisma.post.findMany({
    //     where: {
    //         title: {
    //             endsWith: "Post",
    //         },
    //     },
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    //     select: {
    //         id: true,
    //         title: true,
    //         slug: true,
    //         content: true,
    //     },
    // })

    const user = await prisma.user.findUnique({
        where: {
          email: "drmosuhli@gmail.com",
        },
        include: {
          posts: true,
        },
      });
    
      return user?.posts || [];
}

export async function getPostBySlug(slug: string) {
    return await prisma.post.findUnique({
        where: {
            slug
        }
    })
}

export async function updatePost(id: string, formData: FormData) {
    await prisma.post.update({
        where: {
            id
        },
        data: {
            title: formData.get('title') as string,
            slug: (formData.get('title') as string).replace(/\s/g, '-').toLowerCase(),
            content: formData.get('content') as string
        }
    })
}

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: {
            id
        }
    })
}