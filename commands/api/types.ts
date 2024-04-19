export type ListDevicesResponse = { deviceList: Device[] };

export type Device = {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  enableCloudService: boolean;
  hubDeviceId: string;
};
