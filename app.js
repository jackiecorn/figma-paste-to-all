const pasteToAll = pasteOverSelection => {
	const selectedFrames = pasteOverSelection
		? figmaPlus.scene.selection
		: figmaPlus.scene.selection.filter(selection => selection.type === 'FRAME');
	if (pasteOverSelection) App.triggerAction('delete-selection');
	for (let selectedFrame of selectedFrames) {
		figmaPlus.scene.selection = [selectedFrame];
		pasteOverSelection ? App.triggerAction('paste-over-selection') : App.triggerAction('paste');
	}
};

const placeInPlaceShortcut = {
	mac: {
		command: true,
		key: 'V'
	},
	windows: {
		control: true,
		key: 'V'
	}
};

const placeOverSelectionShortcut = {
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
};

figmaPlus.createPluginsMenuItem('Paste to All', pasteToAll, null, null, [
	{
		itemLabel: 'Paste in Place',
		triggerFunction: () => pasteToAll(false),
		condition: null,
		shortcut: placeInPlaceShortcut
	},
	{
		itemLabel: 'Paste Over Selection',
		triggerFunction: () => pasteToAll(true),
		condition: null,
		shortcut: placeOverSelectionShortcut
	}
]);

figmaPlus.createKeyboardShortcut(
	placeInPlaceShortcut,
	() => pasteToAll(false),
	() => figmaPlus.scene.selection.length > 1
);

figmaPlus.createKeyboardShortcut(
	placeOverSelectionShortcut,
	() => pasteToAll(true),
	() => figmaPlus.scene.selection.length > 1
);
