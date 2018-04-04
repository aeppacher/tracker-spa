# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tracker_spa,
  ecto_repos: [TrackerSpa.Repo]

# Configures the endpoint
config :tracker_spa, TrackerSpaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "HMzPl+anARnjfKuie+YsQK62oP9BrrRPMV6vrptFg2t9UeeEz60OTbubYBzqbqQ4",
  render_errors: [view: TrackerSpaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TrackerSpa.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
