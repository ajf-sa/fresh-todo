/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import db from "../helpers/db.ts";
import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";

interface Todo {
  id: number;
  item: string;
}
export const handler: Handlers<Todo[]> = {
  async GET(r: Request, ctx: HandlerContext<Todo[]>) {
    let todos: Array<Todo> = new Array() as Array<Todo>;
    for (const [id, item] of await db.query("SELECT id,item FROM todo")) {
      let todo = { id: id, item: item } as Todo;
      todos.push(todo);
    }
    return ctx.render(todos);
  },
  async POST(r: Request, ctx: HandlerContext<Todo[]>) {
    let f = await r.formData();
    for (const v of f.entries()) {
      db.query(`insert into todo(item) values ('${v[1]}');`);
    }
    let todos: Array<Todo> = new Array() as Array<Todo>;
    for (const [id, item] of await db.query("SELECT id,item FROM todo")) {
      let todo = { id: id, item: item } as Todo;
      todos.push(todo);
    }
    return ctx.render(todos as Todo[]);
  },
};

export default function Home(props: PageProps<Todo[]>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      {props.data.length ? (
        props.data.map((e) => <h1>{e.item}</h1>)
      ) : (
        <h1>no todo </h1>
      )}

      <form class={tw`form`} action="/" method="POST">
        <input
          style={{ backgroundColor: " #e1e1e1" }}
          class={tw`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300`}
          placeholder="new todo"
          type="text"
          name="item"
        />
        <input
          class={tw`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300`}
          type="submit"
          value="Create Todo"
        />
      </form>
    </div>
  );
}
