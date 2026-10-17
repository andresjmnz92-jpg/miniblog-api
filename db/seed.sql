INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
('Carlos Ruiz', 'carlos@example.com', 'Escritor tecnico especializado en bases de datos'),
('María López', 'maria@example.com', 'Ingeniera de software con foco en API REST');

INSERT INTO posts (title, content, author_id, published) VALUES
('Introduccion a Node.js', 'Node.js es un runtime de javascript...', 1, true),
('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
('APIs RESTful', 'REST es un estilo arquitectonico...', 1, true),
('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
('Async/Await explicado', 'Las promesas simplifican el codigo asincrono...',  1,false);