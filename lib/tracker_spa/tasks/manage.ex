defmodule TrackerSpa.Tasks.Manage do
  use Ecto.Schema
  import Ecto.Changeset
  alias TrackerSpa.Tasks.Manage


  schema "manages" do
    belongs_to :manager, TrackerSpa.Users.User
    belongs_to :managee, TrackerSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(%Manage{} = manage, attrs) do
    manage
    |> cast(attrs, [:manager_id, :managee_id])
    |> validate_required([:manager_id, :managee_id])
  end
end
