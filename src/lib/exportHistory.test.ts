import {
  buildHistoryExportContent,
  downloadTextFile,
  HISTORY_EXPORT_FILENAME,
} from "./exportHistory";

describe("export history (EXPORT)", () => {
  it("EXPORT-01: builds one password per line", () => {
    expect(buildHistoryExportContent(["alpha", "beta"])).toBe("alpha\nbeta");
    expect(HISTORY_EXPORT_FILENAME).toBe("password-history.txt");
  });

  it("EXPORT-01: downloadTextFile creates anchor with blob content", () => {
    const createObjectURL = jest.fn(() => "blob:mock");
    const revokeObjectURL = jest.fn();
    const click = jest.fn();

    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;

    const anchor = { href: "", download: "", click } as unknown as HTMLAnchorElement;
    jest.spyOn(document, "createElement").mockReturnValue(anchor);

    downloadTextFile("one\ntwo", "test.txt");

    expect(createObjectURL).toHaveBeenCalled();
    expect(anchor.download).toBe("test.txt");
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock");
  });
});
