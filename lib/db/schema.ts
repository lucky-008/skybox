import {boolean, integer, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"

export const files = pgTable("files", {
    id:uuid("id").defaultRandom().primaryKey(),
    name:text("name").notNull(),
    path:text("path").notNull(), // /doc/project/resume
    size:integer("size").notNull(),
    type:text("type").notNull(),

    //storage info
    fileUrl:text("file_url"),
    thumbnailUrl:text("thumbnail_url"),

    //ownership
    userId: text("user_id").notNull(),
    parentId:uuid("parent_id"), // parent folder id ,null for root folder

    // file/folder flags
    isFolder:boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash:  boolean("is_trash").default(false).notNull(),

    // timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()

})

/*
parent : Each file/folder can have one parent folder
children : Each folder can have many child file/Folder
*/
export const filesRelation = relations(files,({one, many})=>({

    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    //releationship to child file/Folder
    children: many(files)
}))

//Type defination
export const File = typeof files.$inferSelect // it will show type and fild of table
export const NewFile = typeof files.$inferInsert 

