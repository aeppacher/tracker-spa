defmodule TrackerSpaWeb.TokenController do
  use TrackerSpaWeb, :controller
  alias TrackerSpa.Users.User

  action_fallback TrackerSpaWeb.FallbackController

  def create(conn, %{"name" => name, "pass" => pass}) do
    IO.inspect({name, pass})

    with {:ok, %User{} = user} <- TrackerSpa.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end