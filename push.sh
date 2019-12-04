git add .
read -p "Enter commit message: " message
git commit -m "$message"
git branch -a
read -p "Do you want to push? " decision
if [ $decision == "y" ]; then
  read -p "Which branch you want to push? " branch
  git push origin $branch
fi