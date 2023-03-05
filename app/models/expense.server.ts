import type { Expense } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createExpense(expense: Pick<Expense, 'title' | 'date' |'amount'| 'userId'>){
    return prisma.expense.create({
        data: {
            title: expense.title, 
            date: expense.date, 
            amount: expense.amount,
            User:{ connect:{ id: expense.userId } }
        },
    })
}

export async function getExpenses(userId: string){
    return prisma.expense.findMany({
        where:{
            userId
        },
        select: {
            id: true, 
            title: true, 
            date: true, 
            amount: true
        },
        orderBy: {
            date: 'desc'
        }
    });
}

export async function updateExpense(id:string, updatedData: Pick<Expense, 'date' | 'amount' | 'title'>){
    return prisma.expense.update({
        where:{
            id
        },
        data: updatedData
    })
}

export async function getSingleExpense(id: string){
    return prisma.expense.findUnique({
        where:{
            id
        },
        select: {
            id: true, 
            title: true, 
            date: true, 
            amount: true
        }
    });
}

export async function deleteExpense(id: string){
    return prisma.expense.delete({where: { id }});
}