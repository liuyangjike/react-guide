
 export const data = [
  ['Property', 'Description', 'Type', 'Default'],
  [ "visible", "Whether the guide is visible or not", "boolean", "false"],
  ["audio", "Whether a voice reads of tip  of the guide or not", "boolean", "true"],
  ["lan", "The voice of language, 'en' or 'zh'", "string", "en"],
  ["bullet", "Whether bullets (.) button is visible on middle of the guide or not", "boolean", "false" ],
  ["num",  "Whether num icon is visible on top left of the guide or not", "boolean", "false"],
  ["onCancel", "Specify a function that will be called when a user clicks shadow, skip button on bottom left", "function(e)", "-"],
  ["onOk",  "Specify a function that will be called when all steps have done and click the done button",  "function(e)", "-"],
  ["data-step", "Number of steps for guides, only use in dom", "string", "-"],
  ["data-tip", "Every step you want to show tip, only use in dom", "string", "-"]
]

