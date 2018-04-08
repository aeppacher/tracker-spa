# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TrackerSpa.Repo.insert!(%TrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias TrackerSpa.Repo
  alias TrackerSpa.Users.User
  alias TrackerSpa.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@gmail.com", password_hash: p })
    b = Repo.insert!(%User{ name: "bob", email: "bob@gmail.com", password_hash: p })
    c = Repo.insert!(%User{ name: "carol", email: "carol@gmail.com", password_hash: p })
    d = Repo.insert!(%User{ name: "dave", email: "dave@gmail.com", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, description: "task description", title: "task title" })
    Repo.insert!(%Task{ user_id: b.id, description: "task description", title: "task title" })
    Repo.insert!(%Task{ user_id: b.id, description: "task description", title: "task title" })
    Repo.insert!(%Task{ user_id: c.id, description: "task description", title: "task title" })
    Repo.insert!(%Task{ user_id: d.id, description: "task description", title: "task title" })
  end
end

Seeds.run