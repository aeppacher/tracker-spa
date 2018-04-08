defmodule TrackerSpaWeb.TokenView do
  use TrackerSpaWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      token: token,
    }
  end
end