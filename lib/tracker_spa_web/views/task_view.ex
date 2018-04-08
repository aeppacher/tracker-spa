defmodule TrackerSpaWeb.TaskView do
  use TrackerSpaWeb, :view
  alias TrackerSpaWeb.TaskView
  alias TrackerSpaWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      user: render_one(task.user, UserView, "user.json")}
  end
end
