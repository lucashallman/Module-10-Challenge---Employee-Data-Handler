INSERT INTO departments (title)
VALUES 
    ('Wolf Wrangling'),
    ('Bear Fighting'),
    ('Daffodil Farming'),
    ('Monster Hunting'),
    ('Demon Purging');

INSERT INTO roles (dept_id, title)
VALUES 
    (1, 'Feed Specialist - WR'),
    (1, 'Fang Sharpener'),
    (1, 'Pelt Renderer'),
    
    (2, 'Feed Specialist - BF'),
    (2, 'Claw Manicurist'),
    (2, 'Hibernation Planner'),
    
    (3, 'Flautist'),
    (3, 'Field Prancer'),
    (3, 'Daisy Chain Manufacturing Director'),

    (4,'Cryptozoologist'),
    (4,'Mothman'),
    (4,'Defense Secretary'),

    (5,'High Priest'),
    (5,'Low Priest'),
    (5,'Double Agent');

INSERT INTO employees (dept_id, role_id, name)
VALUES
    (1, 1, 'John Wick'),
    (1, 2, 'Jorsh Kengle'),
    (1, 3, 'Mart Knart'),
    
    (2, 1, 'Grub Pulper'),
    (2, 2, 'Greenboy Smackatron'),
    (2, 3, 'Jimmy Coconuts'),

    (3, 1, 'Cunk Hunkley'),
    (3, 2, 'Brick Masters'),
    (3, 3, 'Leonard Ninjago'),

    (4, 1, 'Greebus Pleeb'),
    (4, 2, 'Walton Goggins'),
    (4, 3, 'Fifteen Ducks'),

    (5, 1, 'Walt Disney'),
    (5, 2, 'Smallt Disney'),
    (5, 3, 'Azakenathon Basil');