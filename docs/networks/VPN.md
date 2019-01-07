# VPN connectivity

Connectivity to different VLANs from arbitrary Internet host can be achieved by means of using OpenVPN technology. There are 3 OpenVPN servers running on the router/firewall (pfSense) appliance. They are targeted to serve the following 3 groups of users

- **Administrators** provides connectivity to all VLANs, requires local authentication with pfSense appliance
- **Faculty** provides connectivity to the [Faculty](/networks/VLAN.md#vlan-800-faculty), [Students](/networks/VLAN.md#vlan-900-students), and  [Playground](/networks/VLAN.md#vlan-600-playground) VLANs
- **Students** provides access to [Students](/networks/VLAN.md#vlan-900-students), and [Playground](/networks/VLAN.md#vlan-600-playground) VLANs

## Connectivity matrix

|                      | Admin | Faculty | Students |
|----------------------|:-----:|:-------:|:--------:|
| VLAN 100. Core       | X     |         |          |
| VLAN 300. Wireless   | X     | X       |          |
| VLAN 400. Terminals  | X     |         |          |
| VLAN 600. Playground | X     | X       | X        |
| VLAN 800. Faculty    | X     | X       |          |
| VLAN 900. Students   | X     | X       | X        |