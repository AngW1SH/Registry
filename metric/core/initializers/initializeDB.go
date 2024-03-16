package initializers

import (
	"core/models"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitializeDB() *gorm.DB {

	var err error

	dsn := os.Getenv("DB_URL")
	db, err := gorm.Open(postgres.Open(dsn))

	if err != nil {
		log.Fatal("Failed to start the database")
	}
	db.AutoMigrate(&models.Snapshot{})

	return db
}