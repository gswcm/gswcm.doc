module.exports = {
	title: "GSWCM",
	description: "Documentation for GSWCM Computing Infrastructure",
	themeConfig: {
		nav: [{ text: "Home", link: "/" }, { text: "Network", link: "/network/" }],
		sidebar: {
			"/network/": genSidebarConfig('Network')
		}
	}
};

function genSidebarConfig(title) {
	return [
		{
			title,
			collapsable: false,
			children: [
				"",
				"addresses",
			]
		}
	];
}
