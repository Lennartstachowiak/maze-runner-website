declare module "constrained-editor-plugin" {
  import * as monaco from "monaco-editor";

  interface ConstrainedEditorInterface {
    initializeIn: (
      editorInstance: monaco.editor.IStandaloneCodeEditor
    ) => boolean;
    addRestrictionsTo: (
      model: monaco.editor.ITextModel,
      ranges: RangeRestrictionObject[]
    ) => monaco.editor.IConstrainedModel;
    removeRestrictionsIn: (model: monaco.editor.ITextModel) => boolean;
    disposeConstrainer: () => boolean;
    toggleDevMode: () => void;
  }

  export function constrainedEditor(
    monaco: typeof monaco
  ): ConstrainedEditorInterface {
    // Your implementation goes here
  }
}
