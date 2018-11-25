# IP addresses and routing

## CIDR ranges
The following CIDR ranges are defined on the PeachNET for our infrastructure
-	WAN: `168.18.64.166/29`
-	LAN: `168.18.104.0/24`

## Incoming traffic
-	The incoming traffic to **WAN** is routed directly.
-	The incoming traffic to **LAN** is routed via `168.18.64.166`

## Outgoing traffic
All outgoing traffic goes through the default gateway `168.18.64.161`