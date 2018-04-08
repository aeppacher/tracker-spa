defmodule TrackerSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string
    field :email, :string
    field :password_hash, :string
    has_many :manager_manages, TrackerSpa.Tasks.Manage, foreign_key: :manager_id
    has_many :managee_manages, TrackerSpa.Tasks.Manage, foreign_key: :managee_id
    has_many :managers, through: [:managee_manages, :manager]
    has_many :managees, through: [:manager_manages, :managee]

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password_hash])
    |> validate_required([:name, :email, :password_hash])
    |> unique_constraint(:email)
  end
end
