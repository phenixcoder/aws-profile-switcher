#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const credFile = fs
  .readFileSync(path.resolve(homedir, ".aws", "credentials"), "utf-8")
  .split("\n");

const profiles = [];
let profileIndex = 0;
let defaultIndex = 0;

credFile.forEach(line => {
  let match = null;
  if ((match = line.match(/\[([a-zA-Z\-]+)\]/))) {
    if (match[1] === "default") {
      profileIndex = 0;
      profiles[0] = {
        name: match[1],
        aws_access_key_id: "",
        aws_secret_access_key: ""
      };
    } else {
      profileIndex = profiles.length ? profiles.length : 1;
      profiles[profileIndex] = {
        name: match[1],
        aws_access_key_id: "",
        aws_secret_access_key: ""
      };
    }
  }

  if ((match = line.match(/aws_access_key_id = ([A-Z0-9]+)/))) {
    profiles[profileIndex].aws_access_key_id = match[1];
  }
  if ((match = line.match(/aws_secret_access_key = ([a-z/+A-Z0-9]+)/))) {
    profiles[profileIndex].aws_secret_access_key = match[1];
  }
});

profiles.forEach((profile, i) => {
  if (profiles[0].aws_access_key_id === profile.aws_access_key_id) {
    defaultIndex = i;
  }
});

profiles[0] = Object.assign({}, profiles[defaultIndex], { name: "default" });

console.log(`Current Default Profile : ${profiles[defaultIndex].name}

Available Profiles:
-------------------`);
profiles.forEach((profile, i) => {
  if (profile.name === "default") {
  } else if (
    profiles[defaultIndex].aws_access_key_id === profile.aws_access_key_id
  ) {
    console.log(`* ${profile.name}\t(${profile.aws_access_key_id})`);
  } else {
    console.log(`  ${profile.name}\t(${profile.aws_access_key_id})`);
  }
});
if (process.argv[2]) {
  profiles.forEach((profile, i) => {
    if (process.argv[2] === profile.name) {
      defaultIndex = i;
    }
  });

  writableFile = "";

  profiles[0] = Object.assign({}, profiles[defaultIndex], { name: "default" });

  profiles.forEach(profile => {
    writableFile +=
      [
        `[${profile.name}]`,
        `aws_access_key_id = ${profile.aws_access_key_id}`,
        `aws_secret_access_key = ${profile.aws_secret_access_key}`,
        ``
      ].join("\n") + "\n";
  });

  fs.writeFileSync(
    path.resolve(homedir, ".aws", "credentials"),
    writableFile,
    "utf-8"
  );

  console.log(`\nProfile "${process.argv[2]}" is now set to default`);
}
