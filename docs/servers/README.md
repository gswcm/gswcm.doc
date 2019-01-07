---
sidebarDepth: 3
---

# General info

Server infrastructure is based on a number of **physical servers** which support its major operations and a number of **virtual servers** which extend such support and provide services for end users. 

## Services

The following types of **services** are implemented on dedicated servers

- Windows AD Domain Controller
  - User authentication/authorization
  - Local certificate authority
  - DNS
  - DHCP
- File storage
  - Storage for individual user profiles
  - Media hosting (video tutorials, presentations, screencasts)
  - iSCSI target (VM storage)
- Router
  - NAT
  - Router/Firewall
  - IPS/IDS solution (Snort)
  - VPN server (OpenVPN)
  - DHCP relay
  - Time server
- ESXi 
  - VMs hosting
  - Virtual networking
  - iSCSI initiator
- vCenter
  - vSphere management
  - Web access to VM consoles

## Operations

Most of the servers are configured to run 24/7. In case of **power failure** (planned shutdown) servers have to be gracefully powered off. Power failure can temporally be tolerated for up to 20 minutes by means of deployed UPS solution. 

::: tip
Desktop computer located in the server room `CWH-103B` is directly connected to [Core VLAN](/networks/VLAN.md#vlan-100-the-core) so it can be used to access any network device within the entire [LAN segment](/networks/IP.md#cidr-ranges). It runs `Windows Server 2008 R2` OS and is a member of `GSWCM AD domain`. A local administrator account might be required (create it if needed) if **Domain Controller** is not available.
:::

### Power off (shutdown)

Power off process has to be performed in the following sequence

- Login to [vCenter VM](https://vc.gswcm.local) (from within [Core VLAN](/networks/VLAN.md#vlan-100-the-core)) with `administrator` account, and initiate OS shutdown sequence (not to be mistaken with power-off) for all VMs excluding **Domain Controller** and **vCenter appliance** itself
- Login to **Domain Controller** VM via RDS and initiate shutdown (preferred) or shutdown VM from vCenter web interface by analogy to other VMs.
- Shutdown **vCenter appliance** 
- Login (with `root` account) to individual consoles (can be accessed one-by-one using KVM switch) of ESXi hosts and shutdown them in any order
- Login to [web interface](https://qnap.gswcm.net) of **file server** (QNAP) and initiate shutdown
- Login to router/firewall appliance (pfSense) either by means of [web interface](https://fireball.gswcm.net) or console and initiate shutdown
- Power off all switches and other appliances (if any)

### Power on (start up)

Having entire infrastructure powered off, e.g. after a long power failure or planned shutdown, the following startup sequence has to be followed to restore normal operation mode

- Power on all 3 switches (sequence is not important). Wait for them to boot properly by acknowledging online status of individual ports
- Power on router/fireball appliance and control its availability by trying its [web interface](https://fireball.gswcm.net), say from 4G connected smartphone
- Power on the QNAP file server and confirm the readiness by assessing availability of its [web interface](https://qnap.gswcm.net)
- Power on two `ESXi-21` physical server located just above 3 UPS units at the bottom of the rack. Wait for at least 5 minutes and check its availability by accessing its [web interface](https://168.18.104.21/ui) from any computer connected to `Core` VLAN. Make sure that at least `Domain Controller` and `VMware vCenter Server Appliance` VMs have started. 
- Power up all other `ESXi` hosts, namely `ESXi-22` and `ESXi-25`. They can be started at the same time. Allow at least 5 minutes for all VMs to start.
- Login to [vCenter appliance](https://vc.gswcm.local) from any computer connected to `Core` VLAN. Check if all VMs that were about to autostart are actually started. Manually start those those which did not (=if needed). Reconfigure VM autostart settings if needed. 
- Power up `Ruckus Wireless Controller` and wait for it to boot. Confirm its proper operation by logging into its [web interface](https://ruckus.gswcm.net) and checking that all 6 access points are functional. 
- Start `LTSP` server (4th server appliance from the bottom) and confirm its operation by accessing its console via KVM switch (channel 4 at the time of writing). Power cycle all thin terminals in CWH-214 so they could synchronize with freshly booted `LTSP` server.

## Availability

Originally all server appliances were equipped with redundant power supplies and fan solutions. The most obsolete appliance (the one that hosts `LTSP` server) lost such redundancy and is recommended to be removed from the infrastructure. The `LTSP` server needs to be moved to the vacant server appliance (3rd from the UPS level) which is not performing any tasks (at the time of writing)

## Storage redundancy

Local storage of `ESXi-21` and `ESXi-22` are implemented on the basis of `RAID-5` configuration (1 disk out of 3 installed may fail). Local storage of `ESXi-25` consists of `RAID-1` array (two HDD) used to store hypervisor itself and a number of SSD storages configured with different `RAID` levels. 

The `QNAP` file server provides `iSCSI` target for the vast majority of non-mission critical VMs and is configured as `RAID-10` array. (4 HDD storage elements). 

