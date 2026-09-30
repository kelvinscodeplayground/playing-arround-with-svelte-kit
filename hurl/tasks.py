import glob
import os
import subprocess
import sys

from invoke.tasks import task


@task
def run(ctx):
    """Run hurl with .env variables. Pass extra flags with -- separator: inv run -- --verbose"""
    files = get_sorted_hurl_files()

    if not files:
        print("No .hurl files found")
        return

    selected = select_file(files)
    if not selected:
        return

    trailing_args = []
    try:
        separator_index = sys.argv.index("--")
        trailing_args = sys.argv[separator_index + 1 :]
    except ValueError:
        pass

    cmd = ["hurl", "--variables-file", ".env", selected] + trailing_args
    os.execvp(cmd[0], cmd)


@task(help={"json": "Process JSON with jq before opening in Zed"})
def zed(ctx, json=False):
    """Launch Zed in stdin mode"""
    if json:
        os.execvp("sh", ["sh", "-c", "jq . | zed -e -"])
    else:
        os.execvp("sh", ["sh", "-c", "zed -e -"])


def get_sorted_hurl_files():
    """Get .hurl files sorted by modification time (newest first)"""
    files = glob.glob("**/*.hurl", recursive=True)

    return sorted(files, key=lambda f: -os.path.getmtime(f))


def select_file(files):
    """Select a file using fzf"""
    try:
        result = subprocess.run(
            ["fzf", "--ansi"],
            input="\n".join(files),
            text=True,
            capture_output=True,
            check=True,
        )
        return result.stdout.strip() if result.stdout else None
    except FileNotFoundError:
        print("fzf not found")
        return None
