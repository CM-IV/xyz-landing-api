import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Todo from '../models/Todo';

export default class TodosController {

    public async getAll() {
        return Todo.all();
    }

    public async index({ request }: HttpContextContract) {
        const page = request.input("page", 1);
        const limit = request.input("per_page", 6);

        return Todo.query().paginate(page, limit);
    }

    public async store({ request, response }) {
        const todoSchema = schema.create({
            title: schema.string({ trim: true }, [
                rules.required()
            ]),
            completed: schema.boolean([
                rules.required()
            ])
        })

        const payload = await request.validate({ schema: todoSchema });

        await Todo.create({
            title: payload.title,
            completed: payload.completed
        });

        return response.created();
    }

    public async show({ params }: HttpContextContract) {
        return Todo.findOrFail(params.id);
    }

    public async update({ params, response, request }) {
        const todo = await Todo.findOrFail(params.id);

        const todoSchema = schema.create({
            title: schema.string({ trim: true }, [
                rules.required()
            ]),
            completed: schema.boolean([
                rules.required()
            ])
        })

        const payload = await request.validate({ schema: todoSchema });

        todo.title = payload.title,
        todo.completed = payload.completed

        todo.save();

        return response.json({ todo });
    }

    public async destroy({ params, response }: HttpContextContract) {
        const todo = await Todo.findOrFail(params.id);

        if (!todo) {
            return `Contact with ID of ${params.id} does not exist!`
        }

        todo.delete();

        response.status(200);

        return `Todo with ID of ${params.id} was deleted!`
    }
}
