import os

# CONFIGURE THIS LIST TO IGNORE FOLDERS
ignore = [".github", ".vscode", "apikey", "coverage",
          "dist", "node_modules", ".git", "generator.py"]

# CONFIGURE THIS VAR TO SET THE MAX LEVEL OF THE TREE
max_level = 1

# CONFIGURE THIS VAR TO SET THE ROOT OF THE TREE
root = "./" # Runs it from project root if set to "." or "./"

# RUN THIS SCRIPT TO GENERATE THE FILE TREE
# THEN RUN THE FOLLOWING VSC EXTENSION TO CONVERT THE FILE TREE TO ASCII TREE
# ----------------------------
# Name: Ascii Tree Generator
# Id: aprilandjan.ascii-tree-generator
# Description: A vscode extension to generate ascii tree of directories or formatting selected text to tree string.
# Version: 1.2.4
# Publisher: aprilandjan
# VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=aprilandjan.ascii-tree-generator


def pre_tree_string(level):
    return "#" * (level+1) + " " if level > 0 else "# "


def generate_tree(path, ignore, file, level, max_level):
    items = os.listdir(path)
    items.sort()
    files = [f for f in items if os.path.isfile(os.path.join(path, f))]
    dirs = [d for d in items if os.path.isdir(
        os.path.join(path, d)) and d not in ignore]
    for d in dirs:
        file.write(pre_tree_string(level) + d + "/" + "\n")
        if level < max_level:
            generate_tree(os.path.join(path, d), ignore,
                          file, level + 1, max_level)
    for f in files:
        file.write(pre_tree_string(level) + f + "\n")

dir_path = os.path.dirname(os.path.realpath(__file__))

file = open(os.path.join(dir_path, "file_tree.txt"), "w", encoding="utf-8")

generate_tree(root, ignore, file, 0, max_level)

file.close()

print("File generated successfully.")
