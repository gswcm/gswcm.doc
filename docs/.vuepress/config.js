module.exports = {
	title: "GSWCM",
	description: "Documentation for GSWCM Computing Infrastructure",
	markdown: {
		extendMarkdown: md => {
      md.use(require('markdown-it-include'))
    }
	},
	themeConfig: {
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Networks", link: "/networks/" },
			{ text: "Servers", link: "/servers/" },
		],
		sidebar: {
			'/networks/': [{
				title: 'Networks',
				collapsable: false,
				children: [
					'',
					'IP',
					'VLAN'
				]
			}],
			'/servers/': [{
				title: 'Servers',
				collapsable: true,
				children: [
					'',
					'physical',
					'virtual'
				]
			}]
		}
	}
}
  