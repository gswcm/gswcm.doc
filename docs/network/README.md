---
sidebarDepth: 3
---

# Network

## General info

The network connectivity of the infrastructure is provided by means of direct connection to the PeachNET (network resource of the USG). Any experiments within network perimeter of the School's network appear to be isolated from the rest of the Campus network.

![Network diagram](./IMGs/NetworkDiagram.png)

## IP addresses and routing
The PeachNET provides 2 IP address ranges: one for *direct* WAN access and one for *routed* LAN access.

### CIDR ranges
The following CIDR ranges are defined on the PeachNET for our infrastructure
-	WAN: `168.18.64.166/29`
-	LAN: `168.18.104.0/24`

### Incoming traffic
-	The incoming traffic to **WAN** is routed directly.
-	The incoming traffic to **LAN** is routed via `168.18.64.166`

### Outgoing traffic
All outgoing traffic goes through the default gateway `168.18.64.161`

## Network segments (VLANs) for LAN
The LAN scope is divided into a number of segments to support traffic isolation.

### VLAN 100. The Core

The CIDR range is currently defined as `168.18.104.0/27`

The **Core** VLAN is intended to host internal infrastructure traffic. It connects management interfaces of ESXi hosts, QNAP fileserver, switches, domain controller and some other entities. 

::: tip Recommendation
Move this VLAN into a dedicated *non-routable* NAT sub-network instead of hosting it on a routable IP range
:::

### VLAN 300. Wireless management

The CIDR range is currently defined as `168.18.104.80/28`

This VLAN is intended to interconnect **wireless access points** (AP) and **wireless traffic controller**. There are 6 APs and 1 controller. They support delivery of other VLANs' traffic to end-user **wireless devices** (laptops, tablets, phones, etc) and can be configured to transparently reflect one or many VLANs to one or many WLANs. 

::: tip Recommendation
Move this VLAN into a dedicated *non-routable* NAT sub-network instead of hosting it on a routable IP range
:::

### VLAN 400. Terminals

The CIDR range is currently defined as `10.0.16.1/24` (NAT)

This VLAN allows for connectivity of thin/fat terminals in rooms 214 and 202. Those terminals have no permanent storage so they **network boot** at start time. This network also hosts a dedicated address allocated to one of the NICs of [LTSP server](/servers/#ltsp)

### VLAN 600. Playground

The CIDR range is currently defined as `168.18.104.32/27`

A number of VMs occupy this VLAN to provide resources for class projects. Examples include the following:
- Linux server for `CSCI 3200` UNIX course
- Management interface of the [LTSP server](/servers/#ltsp)
- A number of `PG-0x` Linux servers used for distributed software development in `CSCI 6220` course
- A `Windows 2016` server for `CIS 6720` course
- A number of VMs for `CSCI 4940` Capstone Project course

::: tip Recommendation
Having capacity of up to 30 routable IP address it is is recommended to **enforce a policy** of *DHCP* based IP address assignment (in favor of *static* allocation schema)
:::