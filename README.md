# AWS CLI PROFILE SWITCHER

Switch AWS profile credential to default and run your aws cli commnadsin different accounts.

## Instalation

`npm install -g aws-credential-switch`

## Run

`> aps`

```shell
Current Default Profile : profile2

Available Profiles:
-------------------
  profile1 (AAAAAAAAAAAAAAA)
* profile2 (BBBBBBBBBBBBBBB)
  profile3 (CCCCCCCCCCCCCCC)
```

`> aps profile3`

```shell
Current Default Profile : profile2

Available Profiles:
-------------------
  profile1 (AAAAAAAAAAAAAAA)
* profile2 (BBBBBBBBBBBBBBB)
  profile3 (CCCCCCCCCCCCCCC)

Default Profile Switched to : profile3
```
