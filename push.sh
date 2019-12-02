git add .
read -p "Enter commit message: " message
git commit -m "$message"
git branch -a
echo -p "Which branch you want to push? " branch
git push origin $branch
