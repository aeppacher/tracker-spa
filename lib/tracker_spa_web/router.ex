defmodule TrackerSpaWeb.Router do
  use TrackerSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TrackerSpaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/register", PageController, :index
    get "/login", PageController, :index
    get "/tasks", PageController, :index
    get "/users/:id", PageController, :index
    get "/feed", PageController, :index
    get "/new-task", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TrackerSpaWeb do
  #   pipe_through :api
  # end
  scope "/api/v1", TrackerSpaWeb do
    pipe_through :api
    resources "/manages", ManageController, except: [:new, :edit]
  	resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/token", TokenController, :create
  end
end
