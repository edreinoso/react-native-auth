cd /Users/ELCHOCO/React Native/react-native-auth
git branch -a
# read -p "Which branch you want to push? " branch
# git checkout $branch
git add .
read -p "Enter commit message: " message
git commit -m "$message"
read -p "Do you want to push? " decision
if [ $decision == "y" ]; then
  git push origin $branch
fi