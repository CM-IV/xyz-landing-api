import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Link from '../models/Link';

export default class LinksController {
    public async index({ request }: HttpContextContract) {
        const page = request.input("page", 1);
        const limit = request.input("per_page", 6);

        return Link.query().paginate(page, limit);
    }

    public async store({ request, response }) {
        const todoSchema = schema.create({
            section_subtitle: schema.string({ trim: true }, [
                rules.required()
            ]),
            link: schema.boolean([
                rules.required()
            ]),
            text: schema.string({}, [
                rules.required()
            ])
        })

        const payload = await request.validate({ schema: todoSchema });

        await Link.create({
            section_subtitle: payload.section_subtitle,
            link: payload.link,
            text: payload.text
        });

        return response.created();
    }

    public async show({ params }: HttpContextContract) {
        return Link.findOrFail(params.id);
    }

    public async update({ params, response, request }) {
        const linkEl = await Link.findOrFail(params.id);

        const linkSchema = schema.create({
            section_subtitle: schema.string({ trim: true }, [
                rules.required()
            ]),
            link: schema.string({}, [
                rules.required()
            ]),
            text: schema.string({}, [
                rules.required()
            ])
        })

        const payload = await request.validate({ schema: linkSchema });

        linkEl.section_subtitle = payload.section_subtitle,
        linkEl.link = payload.link,
        linkEl.text = payload.text


        linkEl.save();

        return response.json({ linkEl });
    }

    public async destroy({ params, response }: HttpContextContract) {
        const linkEl = await Link.findOrFail(params.id);

        if (!linkEl) {
            return `Contact with ID of ${params.id} does not exist!`
        }

        linkEl.delete();

        response.status(200);

        return `Link with ID of ${params.id} was deleted!`
    }
}
