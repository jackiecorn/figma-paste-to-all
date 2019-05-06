const pasteToAll = (pasteOverSelection, event) => {
	const selectedFrames = pasteOverSelection
		? figmaPlus.currentPage.selection
		: figmaPlus.currentPage.selection.filter(selection => selection.type === 'FRAME');
	if (pasteOverSelection && event.type === 'keydown') App.triggerAction('delete-selection');
	for (let selectedFrame of selectedFrames) {
		figmaPlus.currentPage.selection = [selectedFrame];
		pasteOverSelection ? App.triggerAction('paste-over-selection') : App.triggerAction('paste');
	}
};

figmaPlus.addCommand({
	label: 'Paste to All',
	condition: () => figmaPlus.currentPage.selection.length > 0,
	submenu: [
		{
			label: 'Paste in Place',
			action: e => pasteToAll(false, e),
			condition: () =>
				figmaPlus.currentPage.selection.length > 0 &&
				figmaPlus.currentPage.selection.every(node => node.type === 'FRAME'),
			shortcut: {
				mac: {
					command: true,
					key: 'V'
				},
				windows: {
					control: true,
					key: 'V'
				}
			}
		},
		{
			label: 'Paste Over Selection',
			action: e => pasteToAll(true, e),
			condition: () =>
				figmaPlus.currentPage.selection.length > 0 &&
				figmaPlus.currentPage.selection.every(node => node.type === 'FRAME'),
			shortcut: {
				mac: {
					command: true,
					shift: true,
					key: 'V'
				},
				windows: {
					control: true,
					shift: true,
					key: 'V'
				}
			}
		}
	]
});
