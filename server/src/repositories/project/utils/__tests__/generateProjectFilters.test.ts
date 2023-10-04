import { generateProjectFilters } from "../generateProjectFilters";

describe("generateProjectFilters util", () => {
  it("should return an empty filter array when no filters are specified", () => {
    const filters = {};

    const result = generateProjectFilters(filters);

    expect(result).toEqual(
      expect.objectContaining({
        $and: [],
      })
    );
  });

  it("should apply text filter", () => {
    const filters = {
      text: "testtext",
    };

    const result = generateProjectFilters(filters);

    expect(JSON.stringify(result)).toMatch(/testtext/i);
  });

  it("should apply date filters", () => {
    const filters1 = {
      dateStart: new Date("2023-01-01"),
      dateEnd: new Date("2023-02-01"),
    };
    const filters2 = {
      enrollmentStart: new Date("2022-12-10"),
      enrollmentEnd: new Date("2022-12-31"),
    };

    const result1 = generateProjectFilters(filters1);
    const result2 = generateProjectFilters(filters2);

    expect(JSON.stringify(result1)).toMatch(new Date("2023-01-01").toJSON());
    expect(JSON.stringify(result1)).toMatch(new Date("2023-02-01").toJSON());
    expect(JSON.stringify(result2)).toMatch(new Date("2022-12-10").toJSON());
    expect(JSON.stringify(result2)).toMatch(new Date("2022-12-31").toJSON());
  });

  it("should apply status filters", () => {
    const statusOptions = ["Завершённые", "Активные", "С вакансиями"];

    const filtersList = statusOptions.map((option) => ({ status: option }));

    const resultList = filtersList.map((filters) =>
      generateProjectFilters(filters)
    );

    resultList.forEach((result) => {
      expect(result.$and.length).not.toBe(0);
    });
  });
});
