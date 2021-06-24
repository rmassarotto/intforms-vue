export default function ({ store, redirect }) {
  if (store.state.conclusao.concluido) {
    return redirect("/conclusao");
  }
}
