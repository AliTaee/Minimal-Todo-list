describe("Test create, edit and delete notes", () => {
  it("Should go to home page", () => {
    cy.visit("/");
  });

  describe("Test create a note", () => {
    it("Should type a new note text", () => {
      cy.contains(/add to list/i);
      cy.get("[data-test=input-new-note]")
        .type("learning nuxt.js")
        .should("have.value", "learning nuxt.js");
    });

    it("Should Click on submit", () => {
      cy.get("[data-test=submit-note]").click();
    });

    it("Should have 3 note on the list", () => {
      cy.get("[data-test=note-item]").should("have.length", 3);
    });
  });

  describe("Test edit a note", () => {
    it("Should edit a note and save by button", () => {
      cy.get("[data-test=edit-note]").eq(2).click();
      cy.get("[data-test=input-new-note]")
        .clear()
        .type("learning next.js")
        .should("have.value", "learning next.js");
      cy.get("[data-test=submit-note]").click();
      cy.get("[data-test=input-new-note]").should("have.value", "");
      cy.get("[data-test=note-item-label]")
        .eq(2)
        .should("have.text", "learning next.js");
    });

    it("Should edit a note and save by press key enter", () => {
      cy.get("[data-test=edit-note]").eq(2).click();
      cy.get("[data-test=input-new-note]")
        .clear()
        .type("learning PWA")
        .should("have.value", "learning PWA")
        .type("{enter}");
      cy.get("[data-test=input-new-note]").should("have.value", "");
      cy.get("[data-test=note-item-label]")
        .eq(2)
        .should("have.text", "learning PWA");
    });
  });

  describe("Test delete a note", () => {
    it("Should delete a note", () => {
      cy.get("[data-test=delete-note]").eq(2).click();
    });

    it("Should note exist in list", () => {
      cy.get("learning PWA").should("not.exist");
    });

    it("Should have 2 note on the list", () => {
      cy.get("[data-test=note-item]").should("have.length", 2);
    });
  });
});

describe("Test toggle note", () => {
  it("Should go to home page", () => {
    cy.visit("/");
  });

  it("Should toggle a note to done", () => {
    cy.get("[data-test=note-item-state]").eq(0).click();
    cy.get("[data-test=note-item]")
      .eq(0)
      .should("have.class", "todo__item--done");
  });

  it("Should toggle a note to un done", () => {
    cy.get("[data-test=note-item-state]").eq(0).click();
    cy.get("[data-test=note-item]")
      .eq(0)
      .should("have.not.class", "todo__item--done");
  });
});

describe("Test todo list with no note", () => {
  it("Should go to home page", () => {
    cy.visit("/");
  });

  it("Should delete notes on list", () => {
    cy.get("[data-test=delete-note]").first().click();
    cy.get("[data-test=delete-note]").eq(0).click();
  });

  it("Should show a proper message", () => {
    cy.get("[data-test=empty-message]")
      .should("have.length", 1)
      .should("have.text", "There is nothing todo!");
  });
});
