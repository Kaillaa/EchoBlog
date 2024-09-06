import Post from "../models/blogModel.js";
import { z } from "zod";
import formatZodError from "../helpers/zodError.js";

// Validações com ZOD
const createSchema = z.object({
  post: z
    .string()
    .min(3, { msg: "A post deve ter pelo menos 3 caracteres" })
    .transform((txt) => txt.toLowerCase()),
  descricao: z
    .string()
    .min(5, { msg: "A descricao deve ter pelo menos 5 caracteres" }),
});

const getSchema = z.object({
  id: z.string().uuid({msg: "Id da postagem está inválido"})
})

export const createPost = async (request, response) => {
  const bodyValidation = createSchema.safeParse(request.body)
  
  if(!bodyValidation.success){
    response.status(400).json({msg: "Os dados recebidos do corpo são invalidos", detalhes: bodyValidation.error})
    return
  }

  const { post,titulo, descricao } = request.body;


  if (!post) {
    response.status(400).json({ err: "A postagem é obirgatoria" });
    return;
  }
  if (!descricao) {
    response.status(400).json({ err: "A descricao é obirgatoria" });
    return;
  }

  const novoPost = {
    post,
    descricao,
    titulo,
  };
  console.log(novoPost)
  try {
  console.log( await Post.create(novoPost)) 
    response.status(201).json({ msg: "Postagem Cadastrada" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ Err: "Erro ao cadastrar postagem" } + error);
  }
};

export const getAll = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  const offset = (page - 1) * 10;
  try {
    const posts = await Post.findAndCountAll({
      limit,
      offset,
    });
    const totalPaginas = Math.ceil(posts.count / limit);
    response.status(200).json({
      totalposts: posts.count,
      totalPaginas,
      paginaAtual: page,
      itemsPorPagina: limit,
      proximaPagina:
        totalPaginas === 0
          ? null
          : `http://localhost:3333/posts?page=${page + 1}`,
      posts: posts.rows,
    });
  } catch (error) {
    response.status(500).json({ msg: "Erro ao buscar posts" } + error);
  }
};

export const getPost = async (request, response) => {
  const { id } = request.params;

  const paramValidation = getSchema.safeParse(request.params)
  
  if(!paramValidation.success){
    response.status(400).json({msg: "O Id é invalido", detalhes: paramValidation.error})
    return
  }

  try {
    const post = await Post.findByPk(id);
    if (post === null) {
      response.status(404).json({ msg: "Postagem não encontrada" });
      return;
    }
    response.status(200).json(post);
  } catch (error) {
    response.status(500).json({ err: "Erro ao buscar posts" });
  }
};

export const updatePost = async (request, response) => {
  const { id } = request.params;
  const { post, descricao, titulo } = request.body;

  // Validações
  if (!post) {
    response.status(400).json({ msg: "A postagem é obrigatória" });
    return;
  }
  if (!descricao) {
    response.status(400).json({ msg: "A descricao é obrigatória" });
    return;
  }
  if (!titulo) {
    response.status(400).json({ msg: "A titulo é obrigatório" });
    return;
  }

  const postAtualizado = {
    post,
    descricao,
    titulo,
  };
  try {
    const [linhasAfetadas] = await Post.update(postAtualizado, {
      where: { id },
    });
    if (linhasAfetadas === 0) {
      response.status(404).json({ msg: "post não encontrada" });
      return;
    }
    response.status(200).json({ msg: "post Atualizada" });
  } catch (error) {
    response.status(500).json({ msg: "Erro ao atualizar post" + error});
  }
};

export const buscarPostId = async (request, response) => {
  const { situacao } = request.params;

  if (situacao !== "pendente" && situacao !== "concluida") {
    response
      .status(400)
      .json({ msg: "Situacao invalida. Use 'pendente' ou 'concluida'" });
    return;
  }

  try {
    const posts = await Post.findAll({
      where: { status: situacao },
      raw: true,
    });
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json({ err: "Erro ao buscar posts" });
  }
};
