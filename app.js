const paste = () => {
	const selectedFrames = figma.currentPage.selection.filter(selection => selection.type === 'FRAME');
	if (selectedFrames.length === 0) {
		figmaPlus.showToast({ message: 'Please select one or more frames to paste into' });
	}
	for (let selectedFrame of selectedFrames) {
		figma.currentPage.selection = [selectedFrame];
		App.triggerAction('paste');
	}
};

const pasteOverSelection = () => {
	const selectedFrames = figma.currentPage.selection;
	for (let selectedFrame of selectedFrames) {
		figma.currentPage.selection = [selectedFrame];
		App.triggerAction('paste-over-selection');
	}
};

figmaPlus.addCommand({
	label: 'Paste to All',
	condition: () => figma.currentPage.selection.length > 0,
	submenu: [
		{
			label: 'Paste in Place',
			condition: () => figma.currentPage.selection.some(node => node.type === 'FRAME'),
			action: e => paste()
		},
		{
			label: 'Paste Over Selection',
			action: e => pasteOverSelection()
		}
	],
	showInSelectionMenu: true
});
