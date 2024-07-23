#!/bin/bash

bump_npm_version() {
  npm version $1 --no-git-tag-version
}

bump_android_version() {
  buildGradleFile="android/app/build.gradle"
  versionName=$(awk -F\" '/versionName/ {print $2}' $buildGradleFile)
  versionCode=$(awk '/versionCode/ {print $2}' $buildGradleFile)
  newVersionCode=$((versionCode + 1))

  IFS='.' read -r -a versionParts <<< "$versionName"
  case $1 in
    major)
      versionParts[0]=$((versionParts[0] + 1))
      versionParts[1]=0
      versionParts[2]=0
      ;;
    minor)
      versionParts[1]=$((versionParts[1] + 1))
      versionParts[2]=0
      ;;
    patch)
      versionParts[2]=$((versionParts[2] + 1))
      ;;
    *)
      echo "Invalid argument for version bump type. Use 'major', 'minor' or 'patch'."
      exit 1
  esac
  newVersionName="${versionParts[0]}.${versionParts[1]}.${versionParts[2]}"

  sed -i '' "s/versionName \"$versionName\"/versionName \"$newVersionName\"/" $buildGradleFile
  sed -i '' "s/versionCode $versionCode/versionCode $newVersionCode/" $buildGradleFile
}

bump_ios_version() {
  plist="ios/stati/Info.plist"
  versionNumber=$(/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" "$plist")
  buildNumber=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "$plist")
  newBuildNumber=$((buildNumber + 1))

  IFS='.' read -r -a versionParts <<< "$versionNumber"
  case $1 in
    major)
      versionParts[0]=$((versionParts[0] + 1))
      versionParts[1]=0
      versionParts[2]=0
      ;;
    minor)
      versionParts[1]=$((versionParts[1] + 1))
      versionParts[2]=0
      ;;
    patch)
      versionParts[2]=$((versionParts[2] + 1))
      ;;
    *)
      echo "Invalid argument for version bump type. Use 'major', 'minor' or 'patch'."
      exit 1
  esac
  newVersionNumber="${versionParts[0]}.${versionParts[1]}.${versionParts[2]}"

  /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $newVersionNumber" "$plist"
  /usr/libexec/PlistBuddy -c "Set :CFBundleVersion $newBuildNumber" "$plist"
}

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 {major|minor|patch}"
  exit 1
fi

if [[ "$1" != "major" && "$1" != "minor" && "$1" != "patch" ]]; then
  echo "Invalid argument: $1. Use 'major', 'minor', or 'patch'."
  exit 1
fi

bump_npm_version $1
bump_android_version $1
bump_ios_version $1

echo "Version bump complete: $1"
