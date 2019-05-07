const paste = () => {
	const selectedFrames = figmaPlus.currentPage.selection.filter(selection => selection.type === 'FRAME');
	if (selectedFrames.length === 0) {
		figmaPlus.showToast({ message: 'Please select one or more frames to paste into' });
	}
	for (let selectedFrame of selectedFrames) {
		figmaPlus.currentPage.selection = [selectedFrame];
		App.triggerAction('paste');
	}
};

const pasteOverSelection = () => {
	const selectedFrames = figmaPlus.currentPage.selection;
	for (let selectedFrame of selectedFrames) {
		figmaPlus.currentPage.selection = [selectedFrame];
		App.triggerAction('paste-over-selection');
	}
};

figmaPlus.addCommand({
	label: 'Paste to All',
	condition: () => figmaPlus.currentPage.selection.length > 0,
	submenu: [
		{
			label: 'Paste in Place',
			condition: () => figmaPlus.currentPage.selection.some(node => node.type === 'FRAME'),
			action: e => paste()
		},
		{
			label: 'Paste Over Selection',
			action: e => pasteOverSelection()
		}
	],
	showInSelectionMenu: true
});
