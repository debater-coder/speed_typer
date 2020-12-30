module.exports = async function (context, req) {
    context.res = {
      body: {
        "leaderboard": {
            "John Doe": 56,
            "Jane Doe": 47,
            "Speedy Typer": 30
        }
      }
    };
  };