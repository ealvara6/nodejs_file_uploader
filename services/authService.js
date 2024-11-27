const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (data) => {
    return await prisma.user.create({ data });
};

const findUser = async (email) => {
    return await prisma.user.findUnique({
        where: { email: email },
    });
}

const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: id },
    });
}

module.exports = {
    createUser,
    findUser,
    findUserById,
};
