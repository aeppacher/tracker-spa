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
    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice" })
    b = Repo.insert!(%User{ name: "bob" })
    c = Repo.insert!(%User{ name: "carol" })
    d = Repo.insert!(%User{ name: "dave" })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, body: "Hi, I'm Alice" })
    Repo.insert!(%Task{ user_id: b.id, body: "Hi, I'm Bob" })
    Repo.insert!(%Task{ user_id: b.id, body: "Hi, I'm Bob Again" })
    Repo.insert!(%Task{ user_id: c.id, body: "Hi, I'm Carol" })
    Repo.insert!(%Task{ user_id: d.id, body: "Hi, I'm Dave" })
  end
end

Seeds.run