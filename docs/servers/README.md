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
- Power on two `ESXi-21` and `ESXi-22` physical servers located just above 3 UPS units at the bottom of the rack. Confirm their readiness by logging in 



## Availability

## Backups

