# SwitchBot CLI

Simple Command line tool for SwitchBot Devices

## Requirements

- Deno

## Installation

```shell
deno install -n switchbot -fg --allow-env --allow-net https://raw.githubusercontent.com/EkeMinusYou/switchbot-cli/main/switchbot.ts
```

## Usage
Set your SwitchBot token and secret

https://support.switch-bot.com/hc/en-us/articles/12822710195351-How-to-obtain-a-Token

```shell
export SWITCHBOT_API_TOKEN ...
export SWITCHBOT_API_SECRET ...
```

```shell
switchbot device list
switchbot device status <deviceId>
switchbot device command <deviceId> turnon
switchbot device command <deviceId> turnoff
```
