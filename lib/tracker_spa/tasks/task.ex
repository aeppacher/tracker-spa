defmodule TrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
  	field :title, :string
  	field :description, :string
    belongs_to :user, TrackerSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:description, :title, :user_id])
    |> validate_required([:description, :title, :user_id])
  end
end
