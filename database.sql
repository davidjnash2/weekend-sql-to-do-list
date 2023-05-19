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
