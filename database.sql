CREATE TABLE "to_do_list" (
"id" serial PRIMARY KEY,
"task" VARCHAR (200) NOT NULL,
"task_complete" BOOLEAN);

SELECT * FROM "to_do_list";

INSERT INTO "to_do_list" ( "task", "task_complete")
VALUES ('do dishes', FALSE),
('mow lawn', FALSE),
('wash laundry', FALSE),
('fold laundry', FALSE),
('put away laundry', FALSE),
('vacuum', FALSE);

SELECT * FROM "to_do_list";

INSERT INTO "to_do_list"("task", "task_complete")
VALUES ('go grocery shopping', false);

SELECT * FROM "to_do_list";

UPDATE "to_do_list" SET "task_complete" = true WHERE "id" = 3;

SELECT * FROM "to_do_list";

DELETE FROM "to_do_list" WHERE "id" = 4;

SELECT * FROM "to_do_list";