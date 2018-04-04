defmodule TrackerSpaWeb.PageController do
  use TrackerSpaWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
